// const loginUser = async (e) => {
//     e.preventDefault();
//     try {
//         const res = await axios.post('http://localhost:5000/login', userData)
//         console.log(res.data)
//         localStorage.setItem('token', res.data.access_token)
//         localStorage.setItem('email', userData.email)
//         toast.success('Login Successfull', {position: toast.POSITION.TOP_CENTER})
//         navigate('/home')

//     } catch (error) {
//         console.log("error is: ",error)
//         toast.error("Invalid Credentials")
//     }
// }

// const formData = new FormData();
//       setIsLoadingImage(true);
//       formData.append("image", selectedImage);

//       axios
//         .post(
//           `http://127.0.0.1:5000/flood/image?email=${localStorage.getItem(
//             "email"
//           )}&city=${city}`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         )
//         .then((response) => {
//           console.log("Image uploaded successfully", response.data);
//           setIsLoadingImage(false);
//           setFloodData(response.data);
//         })
//         .catch((error) => {
//           console.error("Error uploading image:", error);
//         });