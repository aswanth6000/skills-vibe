'use client'
import {Menu} from 'antd'
import { useRouter } from 'next/navigation'
import {HomeOutlined, UserOutlined, PaperClipOutlined} from '@ant-design/icons'

function AdminMenuList() {
    const handleClick = (e: React.FormEvent<HTMLFormElement> | unknown) =>{
        const keyboardEvent = e as KeyboardEvent
        switch(keyboardEvent.key){
            case 'allUsers':
            router.push('/viewusers')
            break; 
            case 'viewgig': 
            router.push('/viewgigs')
            break;
            default: 
        }
    }
    const router = useRouter()
  return (
    <Menu mode='inline' theme='dark' className='h-auto rounded-2xl' onClick={handleClick}>

    </Menu>
  )
}

export default AdminMenuList