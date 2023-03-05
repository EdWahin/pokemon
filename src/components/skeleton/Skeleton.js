import './skeleton.scss';

const Skeleton = () => {
    return (
        <>
            <p className="char__select">Please select a Pokemon to see information</p>
            <div className="skeleton">
                <div className="pulse skeleton__image"></div>
                <div className="pulse skeleton__name"></div>
                <div className="pulse skeleton__block"></div>
                <div className="pulse skeleton__block"></div>
                <div className="pulse skeleton__block"></div>
            </div>
        </>
    )
}

export default Skeleton;