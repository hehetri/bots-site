<?php
declare(strict_types=1);
$configFile=__DIR__.'/config.php';
$config=is_file($configFile)?require $configFile:require __DIR__.'/config.example.php';
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: '.($config['cors_origin']??'*'));
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if(($_SERVER['REQUEST_METHOD']??'GET')==='OPTIONS'){http_response_code(204);exit;}
function json_response(array $data,int $status=200):never{http_response_code($status);echo json_encode($data,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);exit;}
function db():PDO{
 static $pdo=null;global $config;if($pdo instanceof PDO)return $pdo;
 $c=$config['db'];if(empty($c['user']))throw new RuntimeException('Database credentials are not configured on the server.');
 $dsn="mysql:host={$c['host']};port={$c['port']};dbname={$c['name']};charset={$c['charset']}";
 $pdo=new PDO($dsn,$c['user'],$c['pass'],[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,PDO::ATTR_EMULATE_PREPARES=>false]);
 return $pdo;
}
