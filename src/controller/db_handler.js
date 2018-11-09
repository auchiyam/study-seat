import firebase from '../firestore'

export function get_status() {
    var db = firebase.firestore()
    var chairRef = db.collection("chair")

    return chairRef.get().then(function(ss) {
        var tables = []
        var counter = -1

        ss.forEach(function (chair) {
            var chair_data = chair.data()

            var chair_status = chair_data['chair_status']
            var table_id = parseInt(chair_data['table_id'])
            var chair_id = chair.id

            //if the table id is further than the furthest point, fill the tables array with empty array until the table id is the last index
            if (counter < table_id) {
                var iter = table_id - counter

                for (var i = 0; i < iter; i++) {
                    tables.push([])
                }

                counter = table_id
            }

            tables[table_id] = {
                id: chair_id,
                status: chair_status
            }
        })

        return tables
    })
}