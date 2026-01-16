#!/bin/bash
set -e

# GA4 Analytics Query Script
# Usage: ./check-analytics.sh [events|ioi|funnel|timeseries]

# Configuration
GA4_PROPERTY_ID="${GA4_PROPERTY_ID:-}"
DAYS="${DAYS:-7}"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

if [ -z "$GA4_PROPERTY_ID" ]; then
  echo -e "${RED}Error: GA4_PROPERTY_ID not set${NC}"
  echo ""
  echo "Setup:"
  echo "  1. Get your property ID from GA4 Admin → Property Settings"
  echo "  2. Run: export GA4_PROPERTY_ID=\"your-property-id\""
  echo ""
  echo "Or create ~/.ga4-config with:"
  echo "  GA4_ISTHISHERESY=\"123456789\""
  exit 1
fi

# Check if gcloud is authenticated
if ! gcloud auth application-default print-access-token &>/dev/null; then
  echo -e "${RED}Error: Not authenticated with gcloud${NC}"
  echo ""
  echo "Run:"
  echo "  gcloud auth application-default login \\"
  echo "    --scopes=https://www.googleapis.com/auth/analytics.readonly"
  exit 1
fi

# Get auth token
TOKEN=$(gcloud auth application-default print-access-token)

# Query type
QUERY_TYPE="${1:-events}"

echo -e "${BLUE}📊 GA4 Analytics Query${NC}"
echo -e "Property ID: ${GREEN}${GA4_PROPERTY_ID}${NC}"
echo -e "Date Range: Last ${GREEN}${DAYS}${NC} days"
echo -e "Query Type: ${GREEN}${QUERY_TYPE}${NC}"
echo ""

case "$QUERY_TYPE" in
  events)
    echo -e "${YELLOW}All Events (sorted by count):${NC}"
    echo ""
    curl -s -X POST \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      "https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport" \
      -d "{
        \"dateRanges\": [{\"startDate\": \"${DAYS}daysAgo\", \"endDate\": \"today\"}],
        \"dimensions\": [{\"name\": \"eventName\"}],
        \"metrics\": [{\"name\": \"eventCount\"}],
        \"orderBys\": [{\"metric\": {\"metricName\": \"eventCount\"}, \"desc\": true}]
      }" | jq -r '
        if .rows then
          .rows[] | "  \(.dimensionValues[0].value): \(.metricValues[0].value)"
        else
          "No data found or error occurred. Full response: " + (. | tostring)
        end
      '
    ;;

  ioi)
    echo -e "${YELLOW}Indicators of Interest (IOI):${NC}"
    echo ""
    echo -e "${BLUE}These are your key engagement metrics:${NC}"
    echo "  • verify_click - User clicked AI verification"
    echo "  • share - User clicked share button"
    echo "  • topic_read - User clicked NEXT button"
    echo ""

    RESPONSE=$(curl -s -X POST \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      "https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport" \
      -d "{
        \"dateRanges\": [{\"startDate\": \"${DAYS}daysAgo\", \"endDate\": \"today\"}],
        \"dimensions\": [{\"name\": \"eventName\"}],
        \"metrics\": [{\"name\": \"eventCount\"}, {\"name\": \"totalUsers\"}],
        \"dimensionFilter\": {
          \"filter\": {
            \"fieldName\": \"eventName\",
            \"inListFilter\": {\"values\": [\"verify_click\", \"share\", \"topic_read\"]}
          }
        }
      }")

    echo "$RESPONSE" | jq -r '
      if .rows then
        .rows[] | "  \(.dimensionValues[0].value): \(.metricValues[0].value) events, \(.metricValues[1].value) users"
      else
        "No data found or error occurred"
      end
    '

    # Calculate engagement rate if we have data
    echo ""
    echo -e "${BLUE}Engagement Analysis:${NC}"
    echo "$RESPONSE" | jq -r '
      if .rows then
        "  Total IOI events: \([.rows[].metricValues[0].value | tonumber] | add)"
      else
        empty
      end
    '
    ;;

  funnel)
    echo -e "${YELLOW}Conversion Funnel:${NC}"
    echo ""
    curl -s -X POST \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      "https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport" \
      -d "{
        \"dateRanges\": [{\"startDate\": \"${DAYS}daysAgo\", \"endDate\": \"today\"}],
        \"dimensions\": [{\"name\": \"eventName\"}],
        \"metrics\": [{\"name\": \"eventCount\"}, {\"name\": \"totalUsers\"}],
        \"orderBys\": [{\"metric\": {\"metricName\": \"eventCount\"}, \"desc\": true}]
      }" | jq -r '
        if .rows then
          "Event Name | Event Count | Unique Users" + "\n" +
          "-----------|-------------|-------------" + "\n" +
          (.rows[] | "\(.dimensionValues[0].value) | \(.metricValues[0].value) | \(.metricValues[1].value)")
        else
          "No data found"
        end
      ' | column -t -s '|'
    ;;

  timeseries)
    echo -e "${YELLOW}Event Timeline (daily breakdown):${NC}"
    echo ""
    curl -s -X POST \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      "https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport" \
      -d "{
        \"dateRanges\": [{\"startDate\": \"${DAYS}daysAgo\", \"endDate\": \"today\"}],
        \"dimensions\": [{\"name\": \"date\"}, {\"name\": \"eventName\"}],
        \"metrics\": [{\"name\": \"eventCount\"}],
        \"orderBys\": [{\"dimension\": {\"dimensionName\": \"date\"}, \"desc\": false}]
      }" | jq -r '
        if .rows then
          "Date | Event | Count" + "\n" +
          "----------|----------------|------" + "\n" +
          (.rows[] | "\(.dimensionValues[0].value) | \(.dimensionValues[1].value) | \(.metricValues[0].value)")
        else
          "No data found"
        end
      ' | column -t -s '|'
    ;;

  verify)
    echo -e "${YELLOW}Verify Click Breakdown (by AI provider):${NC}"
    echo ""
    curl -s -X POST \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      "https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport" \
      -d "{
        \"dateRanges\": [{\"startDate\": \"${DAYS}daysAgo\", \"endDate\": \"today\"}],
        \"dimensions\": [
          {\"name\": \"eventName\"},
          {\"name\": \"customEvent:ai_provider\"}
        ],
        \"metrics\": [{\"name\": \"eventCount\"}],
        \"dimensionFilter\": {
          \"filter\": {
            \"fieldName\": \"eventName\",
            \"stringFilter\": {\"value\": \"verify_click\"}
          }
        }
      }" | jq -r '
        if .rows then
          .rows[] | "  \(.dimensionValues[1].value): \(.metricValues[0].value) clicks"
        else
          "No data found. Users may not have clicked verify yet."
        end
      '
    ;;

  *)
    echo -e "${RED}Unknown query type: $QUERY_TYPE${NC}"
    echo ""
    echo "Available queries:"
    echo "  events      - List all events with counts"
    echo "  ioi         - Indicators of Interest (verify, share, next)"
    echo "  funnel      - Conversion funnel with users"
    echo "  timeseries  - Daily event breakdown"
    echo "  verify      - Verify click breakdown by AI provider"
    echo ""
    echo "Usage:"
    echo "  ./check-analytics.sh events"
    echo "  DAYS=30 ./check-analytics.sh ioi"
    exit 1
    ;;
esac

echo ""
