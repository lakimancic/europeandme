<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/odgovori.php';

$database = new Database();
$db = $database->getConnection();

$odgovor = new Odgovor($db);

$data = json_decode(file_get_contents("php://input"), true);

$pit_id = isset($data['pit_id']) ? $data['pit_id'] : die();

$stmt = $odgovor->readCorrect($pit_id);

$num = $stmt->rowCount();

if($num > 0)
{
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $odgovor_item = array(
        "odg_id" => $row["odg_id"],
        "text" => $row["text"]
    );
    
    http_response_code(200);

    echo json_encode($odgovor_item);
}
else
{
    http_response_code(404);
  
    echo json_encode(
        array("message" => "Nema odgovra u bazi podataka sa zadatim parametrima")
    );
}

?>