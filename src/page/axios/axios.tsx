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
    
    const [search, setsearch] = useState<string>("");

    const [Loding, setLoding] = useState<boolean>(true);

    const [cities, setClties] = useState<Citvitrm[]>([]);

    const [datas, setDatas] = useState<Citvitrm[]>([]);


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

        const schema = {
            first_name: "first_name.name",
            last_name: "product.brand"

        }
        try {
            const post = await axios.post<unknown, AxiosResponse<{ data: Citvitrm[] }>>("https://reqres.in/api/users", schema);
            console.log(post);
            // setDatas();
          

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
            <button onClick={() => PostUpdate()}>postUpdate</button>
            <input type="text" placeholder='seh....' onChange={(e)=>setsearch(e.target.value)} />

            {
               
                cities.filter((item)=>{
                    return search.toLowerCase() === '' ? item : item.first_name.toLowerCase().includes(search)
                }).map((row) => {
                    return (
                        <div key={row.id}>
                            <img src={row.avatar} alt="" />
                            <h1>{row.last_name}/name|</h1>
                            <b>{row.first_name}</b>
                            <h2>email | {row.email}</h2>


                            <button onClick={() => putUpdate(row.id)}>Update</button>
                            <button onClick={() => handleDelete(row.id)}>delete</button>
                        </div>
                    )
                })
            }

        </div>)
}