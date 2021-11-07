<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/pitanje.php';

$database = new Database();
$db = $database->getConnection();

$pitanje = new Pitanje($db);

$data = json_decode(file_get_contents("php://input"), true);

$tezina = isset($data['tezina']) ? $data['tezina'] : die();
$oblast = isset($data['oblast']) ? $data['oblast'] : die();

$stmt = $pitanje->readRandom($tezina, $oblast);

$num = $stmt->rowCount();

if($num > 0)
{
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $pitanje_item = array(
        "pit_id" => $row["pit_id"],
        "text" => $row["text"],
        "tezina" => $row["tezina"],
        "oblast" => $row["oblast"]
    );
    http_response_code(200);

    echo json_encode($pitanje_item);
}
else
{
    http_response_code(404);
  
    echo json_encode(
        array("message" => "Nema pitanja u bazi podataka sa zadatim parametrima")
    );
}

?>