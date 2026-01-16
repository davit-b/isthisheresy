# GA4 Analytics Setup

Terminal-based GA4 analytics querying using gcloud auth + Data API.

## One-Time Setup

### 1. Get Your GA4 Property ID

**Option A: From GA4 UI**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click Admin (bottom left)
3. Click Property Settings
4. Copy the Property ID (numeric, e.g., `123456789`)

**Option B: List via API**
```bash
gcloud auth application-default login
curl -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
  "https://analyticsadmin.googleapis.com/v1beta/accountSummaries" | jq '.accountSummaries[].propertySummaries[] | {displayName, property}'
```

### 2. Authenticate with Google Cloud

```bash
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/analytics.readonly
```

This creates credentials at `~/.config/gcloud/application_default_credentials.json`

### 3. Set Environment Variable

**Temporary (current session):**
```bash
export GA4_PROPERTY_ID="123456789"
```

**Permanent (add to ~/.zshrc or ~/.bashrc):**
```bash
echo 'export GA4_PROPERTY_ID="123456789"' >> ~/.zshrc
source ~/.zshrc
```

**Multi-project setup (recommended):**
Create `~/.ga4-config`:
```bash
# isthisheresy
GA4_ISTHISHERESY="123456789"

# VictorAI
GA4_VICTORAI="987654321"
```

Then source and use:
```bash
source ~/.ga4-config
export GA4_PROPERTY_ID="$GA4_ISTHISHERESY"
```

## Usage

### Quick Commands

```bash
# View all events (last 7 days)
npm run analytics

# View Indicators of Interest (IOI): verify, share, next
npm run analytics:ioi

# View conversion funnel
npm run analytics:funnel

# View daily timeline
npm run analytics:timeseries

# View verify button breakdown by AI provider
npm run analytics:verify

# Custom date range (last 30 days)
DAYS=30 npm run analytics:ioi
```

### Direct Script Usage

```bash
# From project root
./scripts/check-analytics.sh events
./scripts/check-analytics.sh ioi

# With custom date range
DAYS=30 ./scripts/check-analytics.sh ioi
```

## Event Names Tracked

### Indicators of Interest (IOI)
- `verify_click` - User clicked AI verification (ChatGPT/Gemini/Grok)
- `share` - User clicked share button
- `topic_read` - User clicked NEXT to go to next topic

### Other Events
- `brick_click` - Homepage topic selection
- `passcode_attempt` - Secret unlock attempt
- `secret_unlocked` - Successful secret unlock
- `infographic_request` - New topic request submission
- `language_change` - Language switcher used

## Troubleshooting

### "GA4_PROPERTY_ID not set"
```bash
export GA4_PROPERTY_ID="123456789"
```

### "Not authenticated with gcloud"
```bash
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/analytics.readonly
```

### "No data found"
- Check that events are actually being sent (test in GA4 Realtime view)
- Verify property ID is correct
- Wait 24-48 hours for data to populate (GA4 has processing delay)
- Try increasing date range: `DAYS=30 npm run analytics`

### "Permission denied" when running script
```bash
chmod +x scripts/check-analytics.sh
```

## GA4 Data API Reference

- [Data API Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Dimension & Metrics Reference](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)

## Advanced Usage

### Custom Queries

Edit `scripts/check-analytics.sh` and add new cases. Example:

```bash
topic-performance)
  # Most popular topics by brick clicks
  curl -s -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    "https://analyticsdata.googleapis.com/v1beta/properties/${GA4_PROPERTY_ID}:runReport" \
    -d "{
      \"dateRanges\": [{\"startDate\": \"${DAYS}daysAgo\", \"endDate\": \"today\"}],
      \"dimensions\": [
        {\"name\": \"eventName\"},
        {\"name\": \"customEvent:topic_id\"}
      ],
      \"metrics\": [{\"name\": \"eventCount\"}],
      \"dimensionFilter\": {
        \"filter\": {
          \"fieldName\": \"eventName\",
          \"stringFilter\": {\"value\": \"brick_click\"}
        }
      },
      \"orderBys\": [{\"metric\": {\"metricName\": \"eventCount\"}, \"desc\": true}]
    }" | jq -r '.rows[] | "\(.dimensionValues[1].value): \(.metricValues[0].value) clicks"'
  ;;
```

Then use:
```bash
./scripts/check-analytics.sh topic-performance
```

## Cost & Limits

- **Cost**: Free (GA4 Data API has generous free tier)
- **Quota**: 200 requests per day per project
- **Rate Limit**: 10 queries per second

To monitor quota usage:
```bash
# View in Google Cloud Console
https://console.cloud.google.com/apis/api/analyticsdata.googleapis.com/quotas
```
