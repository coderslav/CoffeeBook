import React from 'react'
import './createPost.css'


export default function CreatePost() {


    return (
        <div className='container createPostGlobal mt-2'>
            <form className="mt-3">

                <div className="mb-3">
                    <select name="selectPost" className="form-select selectPost" aria-label="Default select example">
                        <option>Choisissez votre catégorie</option>
                        <option value="1">environnement</option>
                        <option value="2">web</option>
                        <option value="3">vacances</option>
                        <option value="4">économie</option>
                    </select>
                </div>

                <div className='mb-3'>
                    <input type="text" className="form-control selectPost" name="titlePost" placeholder="Choisissez un titre"></input>
                </div>

                <div className="mb-3">
                    <textarea className="form-control selectPost" id="validationTextarea" name="textareaPost" placeholder="Ecrivez votre nouveau post" rows="6" required></textarea>
                </div>

                <div className="mb-3">
                    <button className="btn btnSubmitFormPost" type="submit" name="postSubmit">Submit form</button>
                </div>

                <div className='btnFormCreateForm d-flex justify-content-center ml-1 mr-1 mb-3'>
                    <button >Annuler</button>
                    <button>Publier</button>
                </div>
            </form>
        </div>
    )
}
