import LoadingGif from '../../images/loading.gif'

export default function Button ({handleSubmit, name, email, password, confirm, loading}) {
    return (
        <button onClick={handleSubmit} type="submit" className="btn btn-primary" disabled={!name || !email || email.length < 6 || password.length < 6 || !password || !confirm}>
        {loading ? <img src={LoadingGif} alt="Loading" style={{height: "20px"}}/>: "Submit"}
      </button>
    )
}