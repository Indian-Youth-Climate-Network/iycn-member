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
                    <tr id="member_${member.uid}">
                        <td>${member.name}</td>
                        <td>${member.city}</td>
                        <td>${member.state}</td>
                        <td>${member.country}</td>
                        <td><button class="btn btn-primary" onClick="about('member_${member.uid}')">Read More</button><div class="member_about"><h2>About - ${member.name}</h2><p>${member.about}</p><p><b>Email- </b> ${member.email_id}<br><b>Mobile-</b> ${member.phone}</p></div></td>
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

function about(id) {
    $("#modal_about").html($(`#${id} .member_about`).html())
    $("#myModalone").modal()
}