import { useState, useEffect } from "react"


export default function App() {
    const [data, setData] = useState();
    const [update, setUpdate] = useState(1)

    function addItem() {
        fetch('http://localhost:7070/posts', {
            method: 'POST',
            body: JSON.stringify({ content: document.getElementById('inputText').value }),
        }).then(() => {
            console.log('Request send')
            setUpdate(prev => prev === 0 ? 1 : 0)
        }).catch((err) => {
            console.log(err.message);
        });
    }

    function deleteItem(id) {
        fetch(`http://localhost:7070/posts/${id}`, {
            method: 'DELETE',
        }).then(() => {
            console.log('Request send')
            setUpdate(prev => prev === 0 ? 1 : 0)
        }).catch((err) => {
            console.log(err.message);
        });
    }

    useEffect(() => {
        fetch('http://localhost:7070/posts')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [update])

    return (
        <div className="container d-flex flex-wrap justify-content-center" style={{ minHeight: '50vh' }}>
            {data?.map((el) => <>
                <div className="card d-flex w-25 m-3">
                    <button onClick={() => deleteItem(el.id)} className="btn btn-danger align-self-end">&#10005;</button>
                    <div className="card-body">{el.content}</div>
                </div>
            </>)}

            <div className="input-group mt-auto mb-5 align-self-bottom">
                <input className="form-control" id="inputText" />
                <button onClick={addItem} className="input-group-text">Submit</button>
            </div>
        </div>
    )
}
