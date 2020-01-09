import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Map from './Map'
import {TextField, Button, Checkbox, FormControlLabel} from '@material-ui/core'
import axios from 'axios'

const CHICAGO_CORDS = [-87.623177, 41.8781]

const MOCK_LOCATIONS = [{
  location_name: 'Taco Mania',
  loc_lat: -87.623177,
  loc_long: 41.8781,
  avg_sentiment: 1,
  count_keyword: 1,
  reviews: [{
    review_id: 123,
    content: 'taco is good',
    keyword: 'taco'
  }]
}]

const Header = styled.div`
  position: relative;
  display: flex;
  z-index: 3;
  padding: 10px;
  -webkit-box-shadow: 0 4px 6px -6px #222;
  -moz-box-shadow: 0 4px 6px -6px #222;
  box-shadow: 0 4px 6px -6px #222;
  background: #FFFFFF;
  justify-content: space-between;
  align-items: flex-end;
`

const Search = styled.div`
  display: flex;
  justify-content: space-between;
`

const LocationContent = styled.div`
  height: ${({open}) => open ? '700px': '0px'};
  overflow: hidden;
  width: 800px;
  position: fixed;
  z-index: 2;
  top: 68px;
  left: 0;
  background: #FFFFFF;
  transition: height 1s;
`

function App() {
  const [locations, setLocations] = useState(MOCK_LOCATIONS)
  const [keyword, setKeyword] = useState(null)
  const [checked, setChecked] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleTextChange = (e) => {
    setKeyword(e.target.value)
  }
  const handleCheckedChanged = (e) => {
    setChecked(e.target.checked)
  }

  const fetchLocations = async () => {
    setLoading(true)
    try {
      // const response = await axios.get('/whateverendpoint', {
      //   params: {
      //     longitude: CHICAGO_CORDS[0],
      //     latitude: CHICAGO_CORDS[1],
      //     keyword: keyword,
      //     exact: checked
      //   }
      // })
      // setLocations(response.data)
      setTimeout(() => {setLocations(MOCK_LOCATIONS)} , 2000)
    } catch (e) {
      console.error(e)
    } finally {
      // setOpen(true)
      setLoading(false)
    }
  }

  return (
    <>
      <Header>
        <Search>
          <TextField style={{marginRight: '15px', width: '300px'}} label={'Keyword'} onChange={(e) => handleTextChange(e)} value={keyword} size={'medium'}/>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckedChanged}
                value="exact"
                color="primary"
              />
            }
            label="Exact"
          />
          <Button variant="contained" color="primary" onClick={() => fetchLocations()}>{loading ? 'loading' : 'Search'}</Button>
        </Search>
      </Header>
      <LocationContent open={open}>
        <span onClick={() => setOpen(false)}>Roll up</span>
      </LocationContent>
      <Map center={CHICAGO_CORDS} locations={locations}/>
    </>
  )
}

export default App
