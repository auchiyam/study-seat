import DBHandler from './db_handler.js';

export function fetch_status(status) {
    status.setState({
        tables: [
            [1, 2, 3],
            [0, 0, 1, 2],
            [1, 0, 3, 2]
        ]
    });
}