import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';

const TSAView = () =>{


    return (
        <div className="TSAcontainer">
            <div className="TSABox">
                <div className="TSAItems">
                    <label>SANTÉ ET MIEUX-ÊTRE</label>
                </div>

                <div className="TSAQuestion">
                    <div className='TSAnumber'>
                        <label>1</label>
                    </div>
                    <div className='TSAdescription'>
                        <label className='TSALabel'>Nom de l'employé</label>                        
                    </div>
                    <input className='' width={'500px'}/>                    
                </div>

                <div className="TSAQuestion">
                    <div className='TSAnumber'>
                        <label>2</label>
                    </div>
                    <div className='TSAdescription'>
                        <label className='TSALabel'>Valider l'état personnel de l'employé</label>
                        <div className='TSACheckBox'>
                            <CheckBoxComponent label="Confirmé" />
                        </div>                        
                    </div>
                </div>

                <div className="TSAQuestion">
                    <div className='TSAnumber'>
                        <label>3</label>
                    </div>
                    <div className='TSAdescription'>
                        <label className='TSALabel'>Observer le poste 10 secondes, identifier et noter les écarts</label>
                    </div>                    
                </div>


                <div className="TSAItems">
                    <label>QUALITÉ</label>
                </div>

                <div className="TSAQuestion">
                    <div className='TSAnumber'>
                        <label>4</label>
                    </div>
                    <div className='TSAdescription'>
                        <label className='TSALabel'>Perte de temps lié à la qualité? identifier les causes</label>
                    </div>
                </div>

                <div className="TSAQuestion">
                    <div className='TSAnumber'>
                        <label>5</label>
                    </div>
                    <div className='TSAdescription'>
                        <label className='TSALabel'>Est-ce que la cédule de la journée est bien communiqué et compris ? les priorités ?</label>
                        <div className='TSACheckBox'>
                            <CheckBoxComponent label="Confirmé" />
                        </div>
                    </div>
                </div>

                <div className="TSAQuestion">
                    <div className='TSAnumber'>
                        <label>6</label>
                    </div>
                    <div className='TSAdescription'>
                        <label className='TSALabel'>Est-ce que l'employé a vérifier son matériel pour la commande en cours et la prochaine ?</label>
                        <div className='TSACheckBox'>
                            <CheckBoxComponent label="Confirmé" />
                        </div>
                    </div> 
                </div>

                <div className="TSAItems">
                    <label>PRODUCTIVITÉ</label>
                </div>

                <div className="TSAQuestion">
                <div className='TSAnumber'>   
                    <label>7</label>
                </div> 
                <div className='TSAdescription'>
                    <label className='TSALabel'>Vérifier la confirmé des méthodes et le respect des meilleurs pratiques ?</label>
                    <div className='TSACheckBox'>
                        <CheckBoxComponent label="Confirmé" />
                    </div>
                </div>
                </div>

                <div className="TSAQuestion">
                    <div className='TSAnumber'>
                        <label>8</label>
                    </div>
                    <div className='TSAdescription'>
                        <label className='TSALabel'>Communiquer un objectif d'ici à la prochaine TSA (écrire un objectif)</label>
                        <div className='TSACheckBox'>
                            <CheckBoxComponent label="Confirmé" />
                        </div>
                    </div>
                </div>

                <div className="TSAQuestion">
                    <div className='TSAnumber'>
                        <label>9</label>
                    </div>
                    <div className='TSAdescription'>
                        <label className='TSALabel'>Perte de temps, écart humaines ou de cadence ? Identifier les causes</label>
                        <div className='TSACheckBox'>
                            <CheckBoxComponent label="Confirmé" />
                        </div>
                    </div>
                </div>

                <div className="TSAItems">
                    <label>CAPITAL HUMAIN</label>
                </div>

                <div className="TSAQuestion">
                    <div className='TSAnumber'>
                        <label>10</label>
                    </div>
                    <div className='TSAdescription'>
                        <label className='TSALabel'>Perte de temps lié à la formation ? Identifier les causes</label>
                        <div className='TSACheckBox'>
                            <CheckBoxComponent label="Confirmé" />
                        </div>
                    </div>                    
                    
                </div>

                <div className="TSAItems">
                    <label>MAINTENANCE</label>
                </div>

                <div className="TSAQuestion">
                    <div className='TSAnumber'>
                        <label>11</label>
                    </div>
                    <div className='TSAdescription'>
                        <label className='TSALabel'>Perte de temps, écart causés par un équipement ou la maintenance ? Identifier les causes</label>
                        <div className='TSACheckBox'>
                            <CheckBoxComponent label="Confirmé" />
                        </div>
                    </div>                    
                </div>

            </div>
        </div>
    )
}

export default TSAView