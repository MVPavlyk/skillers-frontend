import React from 'react';

const VariantBlock = (variant) => {
    const currentVariant = variant.variant.attributes
    console.log(variant);
    return (
        <div>
            <input type="checkbox"/>
            {currentVariant.text}
        </div>
    );
};

export {VariantBlock};