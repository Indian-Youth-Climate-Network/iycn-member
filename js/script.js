if(localStorage.token === undefined || localStorage.user_id === undefined) 
    window.location = "/"
else {
    $.get({
        url: `${BASE}/api/profile/`,
        headers: {
            Authorization: `Token ${localStorage.token}`
        },
        success: function(data, status) {
            console.log({data, status})
            data.data.map((member) => {
                let dom = `
                    <tr>
                        <td>${member.name}</td>
                        <td><a href="tel:${member.phone}">${member.phone}</a></td>
                        <td><a href="mailto:${member.email_id}">${member.email_id}</a></td>
                        <td>${member.city}</td>
                        <td>${member.state}</td>
                        <td>${member.country}</td>
                        <td>${member.about}</td>
                    </tr>
                `
                $("#member_data").append(dom)
            })

            $('#member_data_table').DataTable()
        },
        error: function(data, status, error) {
            console.log({data, status, error})
        }
    });


    $.get({
        url: `${BASE}/api/profile/${localStorage.user_id}/`,
        headers: {
            Authorization: `Token ${localStorage.token}`
        },
        success: function(data, status) {
            console.log({data, status})
            let dom = `
                <h2>Hi, ${data.data.name}</h2>
                <p>${data.data.about}</p><br>
                <p><b>${data.data.phone} and ${data.data.email_id}</b></p>
                <p style="opacity: 0.6;">${data.data.city}, ${data.data.state}, ${data.data.country}</p>
            `

            $("#user_detail").html(dom)
        },
        error: function(data, status, error) {
            console.log({data, status, error})
        }
    });
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location = "/"
}