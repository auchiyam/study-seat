import {get_status} from './db_handler.js';

export function fetch_status(status) {
    return get_status()

    /* dummy data
    status.setState({
        tables: [
            [1, 2, 3],
            [0, 0, 1, 2],
            [1, 0, 3, 2]
        ]
    });
    */
}