import { Row, AutoComplete, Button, Col } from "@geist-ui/react"
import { useState } from "react"
import axios from 'axios'

const SearchForm = ({ addtoFavorites }) => {
    
      const [ options, setOptions ] = useState()
      const [ formValue, setFormValue ] = useState('')
      const [ searching, setSearching ] = useState(false)
      const [ selected, setSelected ] = useState('')

      const searchHandler = async (currentValue) => {
        if (!currentValue) return setOptions([])
        setSearching(true)
        const { data } = await axios.get(`https://ef238fb7d333.ngrok.io/movies/?q=${currentValue}`)
        setOptions(data.map(({name, id}) => ({ label:name, value:name, id }) ))
        setSearching(false)
        
    }

    return (
        <Row justify='center' gap={0.5}>
            <Col>
                <AutoComplete searching={searching}
                    width="100%"
                    options={options}
                    placeholder="Search movies ..."
                    onSearch={searchHandler}
                    value={formValue} 
                    onChange={setFormValue}
                    onSelect={select => setSelected(select)}
                    clearable
                />
            </Col>
            <Col span={6}>
                <Button type="secondary" ghost  className="search-btn" onClick={() => {
                    if(options !== undefined && options.length !== 0) {
                        if(selected === '') return
                        addtoFavorites(options.find(({ value }) => value === selected ))
                        setFormValue('')
                        setSelected('')
                        setOptions()
                    }
                }}>Add</Button>
            </Col>
        </Row>
    )
}

export default SearchForm