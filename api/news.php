<?php
require __DIR__.'/bootstrap.php';
try{
 $limit=min(max((int)($_GET['limit']??10),1),30);
 $sql='SELECT id,title,excerpt,category,published_at,image_url FROM website_news WHERE is_published=1 ORDER BY published_at DESC LIMIT '.$limit;
 json_response(['ok'=>true,'rows'=>db()->query($sql)->fetchAll()]);
}catch(Throwable $e){json_response(['ok'=>false,'rows'=>[],'message'=>'website_news is not configured yet.'],503);}
