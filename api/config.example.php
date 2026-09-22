<?php
return [
 'db'=>[
  'host'=>getenv('BOTS_DB_HOST') ?: '127.0.0.1',
  'port'=>getenv('BOTS_DB_PORT') ?: '3306',
  'name'=>getenv('BOTS_DB_NAME') ?: 'bout_evolution',
  'user'=>getenv('BOTS_DB_USER') ?: '',
  'pass'=>getenv('BOTS_DB_PASS') ?: '',
  'charset'=>'utf8mb4',
 ],
 'cors_origin'=>getenv('BOTS_CORS_ORIGIN') ?: '*',
];
