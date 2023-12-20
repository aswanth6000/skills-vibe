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
    <Menu mode='inline' className='menu-bar' onClick={handleClick}>
        <Menu.Item key='allusers' icon={<UserOutlined/>}>
            All Users
        </Menu.Item>
        <Menu.Item key='viewgigs' icon={<PaperClipOutlined/>}>
            Gigs
        </Menu.Item>
    </Menu>
  )
}

export default AdminMenuList