# BOTS Online API

PHP + MySQL must run on your VPS/shared hosting; GitHub Pages only serves the static frontend.

## Setup
1. Copy config.example.php to config.php on the PHP server.
2. Set the database credentials using server environment variables or config.php.
3. Never commit config.php or secrets.
4. Test server-status.php.
5. Configure ranking only after confirming the real bout_evolution schema.

## Endpoints
- server-status.php — database connectivity; game/login server probing is not faked.
- ranking.php — configurable mapping for the verified ranking table/columns.
- news.php — optional website_news table.
- players-online.php — optional reliable live player-count source.

## Ranking variables
BOTS_RANK_TABLE, BOTS_RANK_NAME, BOTS_RANK_LEVEL, BOTS_RANK_EXP, BOTS_RANK_GUILD

GM/admin exclusion must be added after the real account/character schema is confirmed.
