
import { HomeIcon as HomeOutline } from '@heroicons/react/outline'
import { HomeIcon as HomeSolid } from '@heroicons/react/solid'
import { PaperAirplaneIcon as PaperOutline } from '@heroicons/react/outline'
import { PaperAirplaneIcon as PaperSolid } from '@heroicons/react/solid'


export const data = [
    {
        id: '1',
        name: 'Home',
        active: <HomeOutline />,
        inactive: <HomeSolid />
    },
    {
        id: '2',
        name: 'Send',
        active: <PaperOutline />,
        inactive: <PaperSolid />
    },
]