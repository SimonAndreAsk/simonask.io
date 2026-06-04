# dataLayer contracts

JSON schemas for `window.dataLayer` events on simonask.io. Synced from [SimonAndreAsk/Analytics](https://github.com/SimonAndreAsk/Analytics).

| Schema | Event |
|--------|--------|
| [`consent_update.json`](./dataLayer/consent_update.json) | `consent_update` |
| [`contact_click.json`](./dataLayer/contact_click.json) | `contact_click` |
| [`contact_form_submit.json`](./dataLayer/contact_form_submit.json) | `contact_form_submit` |

Update [`website/src/lib/tracking/datalayer.ts`](../../website/src/lib/tracking/datalayer.ts) when schemas change.
