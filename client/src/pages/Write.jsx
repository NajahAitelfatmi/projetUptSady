const handleClick = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("authToken");

  if (!token) {
    navigate('/login');  // Redirect to login if not authenticated
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
    },
  };

  try {
    const imgUrl = await upload();  // Assuming you have an upload function
    if (state) {
      await axios.put(`${apiUrl}/posts/${state.id}`, {
        title,
        desc: value,
        cat,
        pdf: file ? imgUrl : "",
      }, config);
    } else {
      await axios.post(`${apiUrl}/posts/`, {
        title,
        desc: value,
        cat,
        pdf: file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      }, config);
    }
    navigate("/h");
  } catch (err) {
    console.log('Error details:', err.response ? err.response.data : err.message);
  }
};
