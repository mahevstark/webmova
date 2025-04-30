import { Loader2 } from "lucide-react";
import React from "react";

const Spinner = ({ size = 24, className = "" }) => {
    return (
        <Loader2
            className={`animate-spin text-muted-foreground ${className}`}
            style={{ width: size, height: size }}
        />
    );
};

export { Spinner };
