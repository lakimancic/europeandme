<?php
class Odgovor {
    private $conn;
    private $table_name = "odgovori";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function readOffered($pit_id)
    {
        $query = "SELECT * FROM ".$this->table_name." WHERE pit_id = ?;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $pit_id);
        $stmt->execute();
        return $stmt;
    }

    public function readCorrect($pit_id)
    {
        $query = "SELECT * FROM ".$this->table_name." WHERE pit_id = ? AND tacan = 1;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $pit_id);
        $stmt->execute();
        return $stmt;
    }
}

?>