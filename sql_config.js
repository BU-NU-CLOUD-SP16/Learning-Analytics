// Module containing configurations for the connections
// Connection information can now be centralized
// also, by keeping it out of version control, security is improved

module.exports = {
    login_data: {
        host: "52.33.14.62",
        user: "remote",
        password: "learninganalytics",
        database: "demo1"
    },
    
    solution_schema:
        "(id INT NOT NULL PRIMARY KEY," +
        "body TEXT," +
        "result TEXT," +
        "metric INT(3)," +
        "correct INT(3)," +
        "problem_id INT(5)," +
        "player_id INT(5)," +
        "created_at DATETIME)",

    problem_schema:
        "(id NOT NULL PRIMARY KEY," +
        "title VARCHAR(255)," +
        "description_html TEXT," +
        "function_template TEXT," +
        "test_suite TEXT," +
        "likes_count INT(5)," +
        "comments_count INT(5)," +
        "created_by VARCHAR(255)," +
        "solvers_count INT(5)," +
        "create_at DATETIME)",

    problem_metrics_schema: 
        "(id INT(11) NOT NULL PRIMARY KEY," +
        "FOREIGN KEY (id) REFERENCES problem(id)," +
        "percent_correct FLOAT(6,3))",

    player_assignment_metrics_schema:
        "(id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT," +
        "player_id INT(5)," +
        //"FOREIGN KEY (player_id) REFERENCES player(id)," +
        "problem_id INT(5)," +
        "FOREIGN KEY (problem_id) REFERENCES problem(id)," +
        "first_correct INT(2))"

};
