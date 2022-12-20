import { useState } from "react";
// import jwt_decode from "jwt-decode";
// import jwt from "jsonwebtoken";
//import { jwt } from "react-jwt";
import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";

const Create = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const profile = { email, password};

        fetch('http://localhost:3000/profiles/auth/login', {
            method: 'POST',
            headers: {"content-Type": "application/json"},
            body: JSON.stringify(profile)
        }).then((response) => {
            if(!response.ok) {
                return response.json().then((response) => {
                    throw new Error(response.message);
                })
            }
            return response.json().then((response) => {
                localStorage.setItem("token", (response.access_token))
                localStorage.setItem("profileId", JSON.stringify(response.profileId))
            })
        })
        .catch((error) => {
            console.log(error.message);
            setErrorMessage(error.message);
          });
      };



      //This will get the right message to the user - wrong email
//     fetch('http://localhost:3000/profiles/auth/login', {
//         method: 'POST',
//         headers: {"content-Type": "application/json"},
//         body: JSON.stringify(profile)
//     })
//     .then((response) => {
//         response.json().then((response) => {
//             console.log(response)
//             console.log(response.message)
//         })

//      })
//    };


// ---------- Before Error handling -----------------

    //     fetch('http://localhost:3000/profiles/auth/login', {
    //         method: 'POST',
    //         headers: {"content-Type": "application/json"},
    //         body: JSON.stringify(profile)
    //     }).then((response) => {
    //         if(!response.ok) {
    //            throw Error("Http error:" + response.status);
    //         } 
    //         response.json().then((response) => {
    //             // console.log(response.access_token)
    //             // console.log(response.profileId)

    //             //response.access_token = "Bearer " + response.access_token;
    //             response.access_token = response.access_token;

    //             //By using stringify it will give the token ""
    //             //which will stop the fetchWithAuthentication
    //             //localStorage.setItem("token", JSON.stringify(response.access_token))
    //             localStorage.setItem("token", (response.access_token))
    //             localStorage.setItem("profileId", JSON.stringify(response.profileId))
    //             if (!localStorage.getItem("token" === undefined)){
    //                 console.log(localStorage.token, "virker som den skal")
    //             }
    //             console.log(localStorage.token, "virker ikke")
    //         })
    //         // return something;
    //     })
    //     .catch((err) => {
    //         console.log(err.message);
    //         console.log(err)
    //         console.log()
    //       });
    //   };

    // ---------- Before Error handling -----------------

    // Before change
    // const fetchByIdTest = (e) => {
    //     e.preventDefault();
    //     const profileId = "638f640b58930d849b8bec47";

    //      fetch('http://localhost:3000/profiles/' + profileId, {
    //         method: 'GET',
    //         headers: {"content-Type": "application/json"},
    //     })
    //     .then((response) => {
    //       response.json().then((response) => {
    //           console.log("pppp",response)
    //           console.log("ææææ", response.errorMessage)
    //       })
    //     })
    // };
       

       const fetchByIdTest = (e) => {
        e.preventDefault();
        const profileId = "638f640b58930d849b8bec47";

         fetch('http://localhost:3000/profiles/638f640b58930d849b8bec47', {
            method: 'GET',
            headers: ({
                'Authorization': `Bearer ${localStorage.token}`, 
                'Content-Type': 'application/json',
            })
        })
        .then((response) => {
          response.json().then((response) => {
              console.log("By Id",response)
          })
        })
    };

    const fetchWithAuthentication = (e) => {
        e.preventDefault();

         fetch('http://localhost:3000/profiles/protected', {
            method: 'GET',
            headers: ({
                'Authorization': `Bearer ${localStorage.token}`, 
                'Content-Type': 'application/json',
            })
        })
        .then((response) => {
          response.json().then((response) => {
              console.log(response)
              console.log(response.email)
          })
        })
    };

    
    const fetchWithAuthenticationGetAll = (e) => {
        e.preventDefault();

       fetch('http://localhost:3000/profiles', {
            method: 'GET',
            headers: ({
                'Authorization': `Bearer ${localStorage.token}`, 
                'Content-Type': 'application/json',
            })
        })
        .then((response) => {
          response.json().then((response) => {
              console.log(response)
          })
        })
    };

    const validateToken = () => {
        console.log("hello")

        jwt.verify(localStorage.token, 'shhhhh', function(err, decoded) {
            if (err) {
                console.log("yep")
              /*
                err = {
                  name: 'TokenExpiredError',
                  message: 'jwt expired',
                  expiredAt: 1408621000
                }
              */
            }
          });


        // jwt.verify(localStorage.token, 'secret', function(err, decode) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     console.log("not here yet")
        // });
    }









    //     fetch('http://localhost:3000/profiles/auth/login', {
    //         method: 'POST',
    //         headers: {"content-Type": "application/json"},
    //         body: JSON.stringify(profile)
    //     }).then((response) => {
    //         if(!response.ok) {
    //            throw Error("Http error:" + response.status);
    //         } 
    //         response.json().then((response) => {
    //             // console.log(response.access_token)
    //             // console.log(response.profileId)

    //             //response.access_token = "Bearer " + response.access_token;
    //             response.access_token = response.access_token;

    //             //By using stringify it will give the token ""
    //             //which will stop the fetchWithAuthentication
    //             //localStorage.setItem("token", JSON.stringify(response.access_token))
    //             localStorage.setItem("token", (response.access_token))
    //             localStorage.setItem("profileId", JSON.stringify(response.profileId))
    //             if (!localStorage.getItem("token" === undefined)){
    //                 console.log(localStorage.token, "virker som den skal")
    //             }
    //             console.log(localStorage.token, "virker ikke")
    //         })
    //         // return something;
    //     })
    //     .catch((err) => {
    //         console.log(err.message);
    //         console.log(err)
    //         console.log()
    //       });
    //   };


    //   const testToken = (e) => {
    //     e.preventDefault();
    //     const localStorageToken = localStorage.getItem("token");

    //     fetch('http://localhost:3000/profiles/protected', {
    //         method: 'GET',
    //         headers: {
    //             Authentication: `Bearer ${localStorageToken.token}`
    //         }
    //     }).then((response) => {
    //         console.log(Authentication);
    //         console.log(localStorageToken);
    //         console.log(localStorageToken.token);
    //         if(!response.ok) {
    //             throw Error("Something went wrong: " + response.status);
    //         }
    //         response.json().then((response) => {
    //             console.log(response.email)
    //             console.log(response.password)
    //         })
    //         // return something;
    //     })
    //     .catch((err) => {
    //         console.log(err.message);
    //       });
    //   };


        // try {
        //     const result = localStorage.getItem("token");
        //     console.log(result);
        //     console.log(localStorage.getItem("token"));
        // } catch (error) {
        //   console.log("redirect to Login page");
        // }

    //   const testToken = () => {
    //     try {
    //         const result = localStorage.getItem("token");
    //         console.log(result);
    //         console.log(localStorage.getItem("token"));
    //     } catch (error) {
    //       console.log("redirect to Login page");
    //     }
    //   };

// -.----------------------------------------------------------------------------


        //       fetch('http://localhost:3000/profiles/auth/login', {
        //     method: 'POST',
        //     headers: {"content-Type": "application/json"},
        //     body: JSON.stringify(profile)
        // }).then((response) => response.json())
        // .then((dataResponse) => {
        //     console.log(dataResponse.access_token)
        //     dataResponse.access_token = "Bearer " + dataResponse.access_token;
        //     // getting the ID from the backend where payload
        //     console.log(dataResponse.profileId)
        //     localStorage.setItem("token", JSON.stringify(dataResponse.access_token))
        //     localStorage.setItem("profileId", JSON.stringify(dataResponse.profileId))
        // })
        //     .catch((err) => {
        //         console.log(err.message);
        //     })
        // }
        


        // fetch('http://localhost:3000/profiles/auth/login', {
        //     method: 'POST',
        //     headers: {"content-Type": "application/json"},
        //     body: JSON.stringify(profile)
        // }).then((response) => response.json())
        // .then((dataResponse) => {
        //     console.log(dataResponse.access_token)
        //     dataResponse.access_token = "Bearer " + dataResponse.access_token;
        //     // getting the ID from the backend where payload
        //     console.log(dataResponse.profileId)
        //     localStorage.setItem("token", JSON.stringify(dataResponse.access_token))
        //     localStorage.setItem("profileId", JSON.stringify(dataResponse.profileId))
        // })
        //     .catch((err) => {
        //         console.log(err.message);
        //     })
        // }

    return (
        <><div className="create">
            <h2>Try loging in</h2>
            <form onSubmit={handleSubmit}>
                <label>Email: </label>
                <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </input>

                <label>Password: </label>
                <input
                    type="text"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </input>
                <button>Login</button>
                {errorMessage && <div className="error"> {errorMessage} </div>}
            </form>
            <button onClick={fetchWithAuthentication}>Fetch With Auth - "protected"</button>
            <button onClick={fetchWithAuthenticationGetAll}>Fetch With Auth - "Get All"</button>
            <button onClick={fetchByIdTest}>Fetch By Id</button>
            <button onClick={validateToken}>validateToken</button>
        </div>
        
        <div>
            <h2> kan jeg se det her</h2>
            <input
                    type="text"
                    required
                    value={errorMessage}
                    onChange={(e) => setErrorMessage(e.target.value)}>
                </input>

            </div></>
    );


}


export default Create;