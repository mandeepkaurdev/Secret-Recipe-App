import React from 'react';
import styles from './RecipeCard.module.css';

const RecipeCard = (props) => (
    <div onClick={() => props.updateDetails(props.id)}>
        <p className={styles.title}>{props.name}</p>
    </div>
);

export default RecipeCard