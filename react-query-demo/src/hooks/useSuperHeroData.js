import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchSuperHero = ({ queryKey }) => {

  // [name, ID], so pick up the ID from the array 
  const heroId = queryKey[1]
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = heroId => {
  const queryClient = useQueryClient()

  // from "super-hero", find the ID 
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data?.find(hero => hero.id === parseInt(heroId))
      if (hero) {
        return { data: hero }
      } else {
        return undefined
      }
    }
  })
}
