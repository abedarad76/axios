import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Lodings } from "./loding"


export function Axios() {
    type Citvitrm = {
        id: number,
        email: string,
        first_name: string,
        last_name: string,
        avatar: string,
    }
    const [Loding, setLoding] = useState<boolean>(true);

    const [cities, setClties] = useState<Citvitrm[]>([]);

    async function getlist() {
        try {
            const List = await axios.get<unknown, AxiosResponse<{ data: Citvitrm[] }>>("https://reqres.in/api/users?page=2");
            console.log(List);
            // setTimeout(()=>{
            //      setClties(List.data.data);
            // },3000)
            setClties(List.data.data);
            setLoding(false);
        } catch (erorr) {
            console.log("API GET", erorr)
        }
    }

    async function PostUpdate() {

        let data = {
            first_name: "AmirMahdi",
            last_name: "ziaaldini",
            email: "amirmahdi@gmail.com",
            avatar: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffa.nody.ir%2F%25D8%25B9%25DA%25A9%25D8%25B3-%25D8%25AF%25D8%25AE%25D8%25AA%25D8%25B1%25D8%25A7%25D9%2586%25D9%2587-%25D8%25A8%25D8%25B1%25D8%25A7%25DB%258C-%25D9%25BE%25D8%25B1%25D9%2588%25D9%2581%25D8%25A7%25DB%258C%25D9%2584%2F&psig=AOvVaw2GydAITdWXTPcaJowrXzIU&ust=1701806689169000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLDX_5LK9oIDFQAAAAAdAAAAABAG"
        }
        try {
            const post = await axios.post("https://reqres.in/api/users", newUser);
            console.log(post);
            setClties({[...cities,data]})
        } catch (erorr) {
            console.log("Api posts ", erorr)
        }

    }




    async function putUpdate(ids: number) {
        console.log("getUpdate", ids);

    };

    async function handleDelete(ids: number) {

    };

    useEffect(() => {
        getlist();

    }, [])
    return (
        <div>
            <button onClick={getlist}>onklok</button>
            {
                // Loding ? (
                //     <Lodings />
                // ) :
                cities.map((row) => {
                    return (
                        <div key={row.id}>
                            <img src={row.avatar} alt="" />
                            <h1>{row.last_name}/name|{row.first_name}</h1>
                            <h2>email | {row.email}</h2>

                            <button onClick={() => PostUpdate()}>postUpdate</button>
                            <button onClick={() => putUpdate(row.id)}>Update</button>
                            <button onClick={() => handleDelete(row.id)}>delete</button>
                        </div>
                    )
                })
            }
        </div>)
}