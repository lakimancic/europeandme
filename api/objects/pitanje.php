<?php
class Pitanje {
    private $conn;
    private $table_name = "pitanja";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function readRandom($tezina, $oblast)
    {
        $query = "SELECT * FROM ".$this->table_name." WHERE tezina = ? AND oblast = ? ORDER BY RAND() LIMIT 1;";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $tezina);
        $stmt->bindParam(2, $oblast);
        $stmt->execute();
        return $stmt;
    }
}
?>