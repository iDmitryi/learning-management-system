import Image from 'next/image'

const Logo = () => {
  return (
    <a href="/">
      <Image height={130} width={130} alt="logo" src="/logo.svg" />
    </a>
  )
}

export default Logo
