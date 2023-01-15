import { useState, useEffect, useCallback } from 'react'

import { Flex, Checkbox, CheckboxGroup, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Stack } from '@chakra-ui/react'

const PlantsCheckBox = ({ filters, handleFilter }) => {

  const categoryOptions = ['succulent', 'palm', 'bonsai', 'fern', 'foliage']
  const locationOptions = ['office', 'living room', 'bedroom', 'bathroom', 'balcony', 'kitchen']
  const sizeOptions = ['small', 'medium', 'large']

  return (
    <Flex className="plants-filter-container">
      <h2 className="plants-filter-title">Filter</h2>
      <Accordion allowMultiple>
        <AccordionItem className="filter-type-wrapper">
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Plant type
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Flex>
              <Flex className="filters-type">
                {categoryOptions.map(option => {
                  // const joined = option.split('').join('-')
                  return (
                    <Flex key={option} className={`${option}-type-filter`}>
                      <input className={`${option}-type-checkbox`} type="checkbox" 
                        value={option} onChange={() => handleFilter('category', option)} />
                      <label>{option}</label>
                    </Flex>
                  )
                })}
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem className="filter-location-wrapper">
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Location
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Flex>
              <Flex className="filters-location">
                {locationOptions.map(option => {
                  const joined = option.split('').join('-')
                  return (
                    <Flex key={option} className={`${joined}-location-filter`}>
                      <input className={`${joined}-location-checkbox`} type="checkbox" 
                        value={option} onChange={() => handleFilter('idealLocation', option)} />
                      <label>{option}</label>
                    </Flex>
                  )
                })}
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem className="filter-sunlight-wrapper">
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Sunlight required
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Flex>
              <Flex className="filters-sunlight">
                {sizeOptions.map(option => {
                  // const joined = option.split('').join('-')
                  return (
                    <Flex key={option} className={`${option}-sunlight-filter`}>
                      <input className={`${option}-sunlight-checkbox`} type="checkbox" 
                        value={option} onChange={() => handleFilter('sunlightRequired', option)} />
                      <label>{option}</label>
                    </Flex>
                  )
                })}
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem className="filter-height-wrapper">
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Plant height
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Flex>
              <Flex className="filters-height">
                {sizeOptions.map(option => {
                  // const joined = option.split('').join('-')
                  return (
                    <Flex key={option} className={`${option}-height-filter`}>
                      <input className={`${option}-height-checkbox`} type="checkbox" 
                        value={option} onChange={() => handleFilter('plantHeight', option)} />
                      <label>{option}</label>
                    </Flex>
                  )
                })}
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Flex className="filters-beginner">
        <Flex className="beginner-filter">
          <input className="beginner-checkbox" type="checkbox" 
            onChange={(e) => handleFilter('beginnerFriendly', e.target.checked)}
          />
          <label>Beginner friendly</label>
        </Flex>
      </Flex>
      <Flex className="filters-safe">
        <Flex className="safe-filter">
          <input className="safe-checkbox" type="checkbox" 
            onChange={(e) => handleFilter('safeForPetsOrChildren', e.target.checked)}/>
          <label>Children and pet friendly</label>
        </Flex>
      </Flex>
    </Flex>
  )  
}

export default PlantsCheckBox
