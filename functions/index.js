const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

exports.handleReservations = functions.firestore
    .document('chair/{chair_id}/reservation/{reservation_id}')
    .onCreate((snap, context) => {
        
        db = admin.firestore()

        var chair_id = context.params.chair_id
        var res_id = context.params.reservation_id

        //check if anyone is trying to reserve that seat right now
        return db.collection("pending_reservations").doc(chair_id).get()
        .then(function(ss) {
            var pending = ss.data()['r_id']

            return (pending === res_id) || (pending === "")
        })
        .then(function(available) {
            //if no one was reserving it, reserve it
            if (available) {
                var timer = (1000 * 20)
                db.collection("pending_reservations").doc(chair_id).set({
                    r_id: res_id
                })

                db.collection(`chair/${chair_id}/reservation`).doc(res_id).set({
                    endDate: (new Date().getTime() + timer),
                    status: true
                })

                db.collection(`chair/`).doc(chair_id).update({
                    chair_status: "2"
                })

                //delete the reservation status after the timer is up
                setTimeout(
                    () => {
                        db.collection(`chair/${chair_id}/reservation`).doc(res_id).delete()
                        db.collection(`chair`).doc(chair_id).update({
                                chair_status: "0"
                        })
                        db.collection("pending_reservations").doc(chair_id).update({
                            r_id: ""
                        })
                    }, 
                    timer
                )
            //if someone was already reserving a seat, change the status to false
            } else {
                db.collection(`chair/${chair_id}/reservation`).doc(res_id).set({
                    status: false
                })
            }
        })

        
    })