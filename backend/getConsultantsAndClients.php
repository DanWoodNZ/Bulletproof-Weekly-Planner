<?php

require_once 'database.php';

$boardID = 1;
$clients = array();
$consultants = array();

$query = "SELECT id,
full_name,
abbreviation,
board_position
FROM client
WHERE board_id = $boardID";

//Run query on connection
$result = $conn->query($query);

//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $client =
            [
            "id" => $row['id'],
            "name" => $row['full_name'],
            "abbreviation" => $row['abbreviation'],
            "position" => $row['board_position'],
        ];
        array_push($clients, $client);
    }
}

//Query to retrieve all client names from clients table
$query = "SELECT id,
    full_name,
    job_title,
    board_position
FROM consultant
WHERE board_id = $boardID";

//Run query on connection
$result = $conn->query($query);

//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $id = $row['id'];
        $allocations = array();
        $query = "SELECT
        allocated_to,
        allocation_slot,
        office_status
        FROM allocation
        WHERE consultant_id =  $id";

        $allocationResult = $conn->query($query);

        echo ($conn->error);

        if ($allocationResult->num_rows > 0) {
            while ($allocationRow = $allocationResult->fetch_assoc()) {
                $allocation = [
                    "allocatedto" => $allocationRow['allocated_to'],
                    "allocationslot" => $allocationRow['allocation_slot'],
                    "officestatus" => $allocationRow['office_status'],
                ];
                array_push($allocations, $allocation);
            }
        }

        $consultant =
            [
            "id" => $row['id'],
            "name" => $row['full_name'],
            "role" => $row['job_title'],
            "position" => $row['board_position'],
            "allocations" => $allocations,
        ];
        array_push($consultants, $consultant);
    }
}
// Convert Array to JSON String
$returnArrays = array($consultants, $clients);
echo json_encode($returnArrays);
mysqli_close($conn);