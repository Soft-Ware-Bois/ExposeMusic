export default function Dropdown(){
    const data = [
        {value: 1, name: 'Most played song'},
        {value: 2, name: 'Most played artist'},
        {value: 3, name: 'Most played album'},
    ]

    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <select >
                {data.map((item, idx) => <option key={idx} value={item.value}>{item.name}</option>)}
            </select>
        </div>
    )
}