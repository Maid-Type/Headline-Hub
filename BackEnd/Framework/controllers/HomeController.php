<?php

namespace Framework\controllers;
use Framework\db\Database;
use Throwable;

class HomeController {
    private $db;
    public function __construct() {
        $config = require getPath() . "helpers/config.php";
        $this->db = new Database($config);
    }

    public function news() {
        // Sanitize input and set default values
        $userID = htmlspecialchars($_GET['userID'] ?? '');
        $limit = (int) htmlspecialchars($_GET['limit'] ?? 50);
        $status = htmlspecialchars($_GET['status'] ?? '');  // Default to empty if not provided

        // Prepare options for user query
        $options = [
            'userID' => $userID,
        ];

        $user = null;

        // Try fetching the user
        try {
            $user = $this->db->query("SELECT * FROM users WHERE ID = :userID", $options, ['count' => 'single']);
        } catch (Throwable $e) {
            return ['errors' => $e->getMessage()];
        }

        // If user doesn't exist
        if (!$user) {
            return ['message' => 'User with that ID does not exist!'];
        }

        // Prepare options for posts query
        $options = [
            'status' => $status,  // Corrected the syntax here: Added missing comma
            'limit' => $limit,
        ];

        // Controls for the query
        $controls = [
            'count' => 'all',
        ];

        // Try fetching posts based on status and limit
        try {
            $result = $this->db->query("SELECT * FROM posts WHERE status = :status LIMIT :limit", $options, $controls);
        } catch (Throwable $e) {
            return ['message' => 'Problem with database!'];
        }

        // If posts are found, return them; otherwise, show a message
        if (!empty($result)) {
            return $result;
        } else {
            return 'No news found!';
        }
    }


    public function getNewsPost($params) {
        $ID = (int) htmlspecialchars($params['id']);
        $userID = htmlspecialchars($_GET['userID'] ?? '');

        $controls = [
            'count' => 'single'
        ];

        $user = null;

        try {
            $user = $this->db->query("SELECT * FROM users WHERE ID = :userID", ['userID' => $userID],$controls);

            if (!$user) {
                return ['message' => 'User with that ID does not exist!'];
            }
        } catch (Throwable $e) {
            return ['errors' => $e->getMessage()];
        }

        try {
            if ($user['is_admin'] === 0) {
                return $this->db->query(
                    "SELECT * FROM posts WHERE post_id = :id AND status = 'approved'",
                    ['id' => $ID],
                    $controls
                );
            } else {
                return $this->db->query(
                    "SELECT * FROM posts WHERE post_id = :id",
                    ['id' => $ID],
                    $controls
                );
            }
        } catch (Throwable $e) {
            return ['errors' => $e->getMessage()];
        }
    }
}