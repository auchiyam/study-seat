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

            tables[table_id].push({
                id: chair_id,
                status: chair_status
            })
        })

        return tables
    })
}

export function reserve_seat(chair_id) {
    var db = firebase.firestore()
    var resRef = db.collection(`chair/${chair_id}/reservation`)

    //add itself to the reservation, first person that manages to add itself wins the first come first serve
    return resRef.add({
        date_added: new Date().getUTCMilliseconds()
    })
    .then(function(docRef) {
        var id = docRef.id
        var success = false
        var count = 0

        var unsubscribe = docRef.onSnapshot(function(ss) {
            success = ss.data()['status']
            
            if (count === 1) {
                if (success && count === 1) {
                    alert("Successfully reserved the seat!")
                } else {
                    alert("Failed to reserve the seat")
                }
                unsubscribe()
            }

            count++
        })

        return success
    })
}