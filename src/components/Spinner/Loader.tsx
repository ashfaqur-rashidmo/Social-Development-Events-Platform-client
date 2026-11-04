import React from 'react';
import {Spinner} from "@heroui/react";


const Loader = () => {
    return (
        <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-xs text-muted">Loading...</span>
      </div>
            
        </div>
    );
};

export default Loader;