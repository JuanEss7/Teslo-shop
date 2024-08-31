
import Image from 'next/image'
interface Props {
    session: {
        image?: string | null,
        name: string,
        role: string,
        email: string
    }
}
function Profile({ session }: Props) {
    const { email, name, role, image } = session;
    return (
        <section className="h-[60dvh] flex flex-col items-center justify-center gap-2">
            <Image
                src={`${image === null ? '/profile/user.png' : image}`}
                height={200}
                width={200}
                alt={`Imagen de perfil de ${name}`}
                className="shadow-md rounded-full object-cover"
            />
            <h3 className='text-3xl font-bold'>{name}</h3>
            <span className='text-xl'>{email}</span>
            <span className='text-xl font-semibold'>{role === 'admin' ? 'Admin' : 'User'}</span>
        </section>
    )
}

export default Profile