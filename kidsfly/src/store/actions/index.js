import { axiosWithAuth } from "../../utils"
import axios from "axios"

export const START = "START"
export const APPLY_STAFF_SUCCESS = "APPLY_STAFF_SUCCESS"
export const LOGIN_STAFF_SUCCESS = "LOGIN_STAFF_SUCCESS"
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"
export const REGISTER_STAFF_SUCCESS = "REGISTER_STAFF_SUCCESS"
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS"
export const GETALLTRIPS_SUCCESS = "GETALLTRIPS_SUCCESS"
export const ADD_FLIGHT_SUCCESS = "ADD_FLIGHT_SUCCESS"
export const EDIT_FLIGHT_SUCCESS = "EDIT_FLIGHT_SUCCESS"
export const DELETE_FLIGHT_SUCCESS = "DELETE_FLIGHT_SUCCESS"
export const GETAIRPORTBYCOORDS_SUCCESS = "GETAIRPORTBYCOORDS_SUCCESS"
export const ERROR = "ERROR"


{/**Login Existing User
POST to https://bw-kids-fly.herokuapp.com/api/auth/login/user

input:{   "username": "LambdaStudent247",    "password": "password"}
Example Output:

{ "message": "Welcome LambdaStudent247!", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiTGFtYmRhU3R1ZGVudDI0NyIsInJvbGVzIjoidXNlciIsImlhdCI6MTU3ODM3MTE5NCwiZXhwIjoxNTc4NDU3NTk0fQ.N1XJpSGk2n33FdnMGaLn4TGf-P2C8XS6II8G_KqyWJc" } */}
export const loginUser = (credentials) => dispatch => {
    dispatch({ type: START })
    axiosWithAuth
        .post(`/auth/login/user`, credentials)
        .then(res => dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: ERROR, payload: err }))
}
{/**Login Existing Admin
POST to https://bw-kids-fly.herokuapp.com/api/adminauth/login/admin

Input{  "username": "LambdaStudent5000",  "password": "password"}
Example Output:

{ "message": "Welcome admin LambdaStudent5000!", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlkIjoxLCJ1c2VybmFtZSI6IkxhbWJkYVN0dWRlbnQ1MDAwIiwicm9sZXMiOiJhZG1pbiIsImlhdCI6MTU3ODM3MTQwMywiZXhwIjoxNTc4NDU3ODAzfQ.BLegBiUvih24THUB7LgzEFOnErW69vNXpfrMo9xfn50" } */}
export const loginSTAFF = (credentials) => dispatch => {
    dispatch({ type: START })
    axiosWithAuth
        .post(`/adminauth/login/admin`, credentials)
        .then(res => dispatch({ type: LOGIN_STAFF_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: ERROR, payload: err }))
}


{/**Register New User
POST to https://bw-kids-fly.herokuapp.com/api/auth/register/user

Input  {  "username": "LambdaStudent247",    "password": "password",    "confirm": "password",    "first_name": "Heather",
    "last_name": "Ridgill",    "street_address": "123 Lambda Court",    "city": "LambdaVille",    "state": "CA",
    "zip": "92831",    "phone_number": "555-555-5555",    "home_airport": "LAX"}
Example Output:

{ "id": 1, "username": "LambdaStudent247", "password": "$2a$10$6NrOGH/43.iC.t8gndaGV.N3ZNRnaaoln44K.urxOCsgmdwp67EeK", "first_name": "Heather", "last_name": "Ridgill", "street_address": "123 Lambda Court", "city": "LambdaVille", "state": "CA", "zip": "92831", "phone_number": "555-555-5555", "home_airport": "LAX", "admin": 0 } */}
export const registerUser = (credentials) => dispatch => {
    dispatch({ type: START })
    axiosWithAuth
        .post(`/register`, credentials)
        .then(res => dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: ERROR, payload: err }))
}
{/**Register New Admin
POST to https://bw-kids-fly.herokuapp.com/api/adminauth/register/admin

Input{    "username": "LambdaStudent5000",    "password": "password"}
Example Output:

{ "id": 1, "username": "LambdaStudent5000", "password": "$2a$10$X58bC9c2vZxnG6mgvf16uexgaaiyIDcyxRwLEw/34G54DF8r3mCaK" } */}
export const registerSTAFF = (credentials) => dispatch => {
    dispatch({ type: START })
    axiosWithAuth
        .post(`/adminauth/register/admin`, credentials)
        .then(res => dispatch({ type: REGISTER_STAFF_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: ERROR, payload: err }))
}

{/**Submitting an application
POST to https://bw-kids-fly.herokuapp.com/api/apps

{
	{email: 'LambdaStudent365@Lambda.edu'},
    {password: 'password'},
    {confirm: 'password'}
    {first_name: 'Heather'},
    {last_name: 'Ridgill'},
    
}
Example Output: { "message": "You have now applied to be a KidsFlyConnection Staff Member!" } */}
export const applySTAFF = (credentials) => dispatch => {
    dispatch({ type: START })
    axiosWithAuth
        .post(`/apps`, credentials)
        .then(res => dispatch({ type: APPLY_STAFF_SUCCESS, payload:{...res.data,...credentials} }))
        .catch(err => dispatch({ type: ERROR, payload: err }))
}


{/**Get ALL trips 
    Output: [  {"airport name": 'LAX', airline: 'Southwest',"flight_number": '1544', "departure_time": '2:30PM',"carryon_items": '5', children: '3', "special_needs": 'We have a stroller'}, ]
    GET to https://bw-kids-fly.herokuapp.com/api/trips
     */}
export const gettrips = (user) => dispatch => {
    dispatch({ type: START })
    axiosWithAuth()
        .get(`trips`)
        .then(res => dispatch({ type: GETALLTRIPS_SUCCESS, payload: res.data }) && console.log(res))

        .catch(err => dispatch({ type: ERROR, payload: err }))

}


{/**Post a new trip AUTH
    Input:      {   "airport_name": "SFO",        "airline": "1255",        "flight_number": "25",        "departure_time": "12PM",
                  "carryon_items": "3",        "checked_items": "1",        "children": "10",        "special_needs": "We have a stroller",}
    Output:    { "message": "Congratulations, you successfully created a new trip!", "accountID": [ 1 ] } 
    POST to https://bw-kids-fly.herokuapp.com/api/trips/trip
*/}

export const addFlight = (flightObj) => dispatch => {
    dispatch({ type: START })
    axiosWithAuth
        .post(`/user/addflight`, flightObj)
        .then(res => dispatch({ type: ADD_FLIGHT_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: ERROR, payload: err }))
}


{/**Update trip
    Takes a JWT and updated trip properties  
PUT to https://bw-kids-fly.herokuapp.com/api/trip/:id //where id is trip's ID*/}

export const editFlight = (flightObj) => dispatch => {
    dispatch({ type: START })
    axiosWithAuth
        .put(`/trip/${flightObj.id}`, flightObj)
        .then(res => dispatch({ type: EDIT_FLIGHT_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: ERROR, payload: err }))
}


{/**Delete Trip.id
    //where id is trip's ID
    Takes a JWT
DELETE to https://bw-kids-fly.herokuapp.com/api/trip/:id 
 */}
export const deleteFlight = (flightObj) => dispatch => {
    dispatch({ type: START })
    axiosWithAuth
        .delete(`/trip/${flightObj.id}`, flightObj)
        .then(res => dispatch({ type: DELETE_FLIGHT_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: ERROR, payload: err }))
}

export const getAiportByCoords = (position) => dispatch => {
    dispatch({ type: START })
    axios
        .get(`https://aerodatabox.p.rapidapi.com/airports/search/location/${position.coords.latitude}/${position.coords.longitude}/mi/50/16`)
        .then(res => dispatch({ type: GETAIRPORTBYCOORDS_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: ERROR, payload: err }))

}
