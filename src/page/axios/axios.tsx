import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Lodings } from "./loding"


export function Axios() {


    type Citvitrm = {
        id: number,
        email?: string,
        first_name: string,
        last_name: string,
        avatar?: string,
    }


    const [Loding, setLoding] = useState<boolean>(true);

    const [search, setsearch] = useState<string>("");
    const [cities, setClties] = useState<Citvitrm[]>([]);

    const baseUrl = "https://reqres.in/api/users";
    const [inputs, setInputs] = useState<Citvitrm>({} as Citvitrm)

    async function getlist() {
        try {
            const List = await axios.get<unknown, AxiosResponse<{ data: Citvitrm[] }>>(`${baseUrl}?page=2`);
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

        // const schema = {
        //     first_name: "first_name.name",
        //     last_name: "product.brand"

        // }

        try {
            const post = await axios.post<unknown, AxiosResponse<Citvitrm>>(baseUrl, inputs);
            console.log(post.data);
            if (post.status === 201) {
                let temp = post.data;

                setClties([...cities, temp])
            }

        } catch (erorr) {
            console.log("Api posts ", erorr)
        }

    }


    async function putUpdate(ids: number) {

        try {

            let tempUser = cities.filter(item => item.id === ids)[0];
            tempUser = { ...tempUser, ...inputs }
            const response = await axios.patch<unknown, AxiosResponse<Citvitrm>>(`${baseUrl}/${ids}`, tempUser);
            if (response.status === 200) {
                let tempUser = cities.filter(item => item.id === ids)[0];
                tempUser = { ...tempUser, ...response.data }
                let temp = cities.filter(item => item.id !== ids);
                temp.push(tempUser)
                setClties(() => [...temp])
            }
            console.log(response)

        } catch (erorr) {
            console.log("Api posts ", erorr)
        }

    };

    async function patchUpdate(ids: number) {

        try {

            const response = await axios.patch<unknown, AxiosResponse<Citvitrm>>(`${baseUrl}/${ids}`, inputs);
            if (response.status === 200) {
                let tempUser = cities.filter(item => item.id === ids)[0];
                tempUser = { ...tempUser, ...response.data }
                let temp = cities.filter(item => item.id !== ids);
                temp.push(tempUser)
                setClties(() => [...temp])
            }
            console.log(response);

        } catch (erorr) {
            console.log("Api posts ", erorr)
        }


    };

    async function handleDelete(ids: number) {
        try {
            const response = await axios.delete<unknown, AxiosResponse<Citvitrm>>(`${baseUrl}/${ids}`);
            if (response.status === 204) {
                let temp = cities.filter(item => item.id !== ids);
                setClties(() => [...temp])
            }

        } catch (erorr) {
            console.log("Api posts ", erorr)
        }
    };

    useEffect(() => {
        getlist();
    }, []);

    function searchBox (item:Citvitrm){
       return search.toLowerCase() === '' ? item : item.first_name.toLowerCase().includes(search)
    }

    return (
        <div>
            <button onClick={() => PostUpdate()}>postUpdate</button>
            <input type="text" placeholder='seh....' onChange={(e) => setsearch(e.target.value)} />

            <input type="text" placeholder='name' onChange={(e) => setInputs((props) => { return { ...props, first_name: e.target.value } })} />
            <input type="text" placeholder='lastname' onChange={(e) => setInputs((props) => { return { ...props, last_name: e.target.value } })} />
            <input type="text" placeholder='email' onChange={(e) => setInputs((props) => { return { ...props, email: e.target.value } })} />

            {

                cities.filter((item) => {
                    return searchBox(item)
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
