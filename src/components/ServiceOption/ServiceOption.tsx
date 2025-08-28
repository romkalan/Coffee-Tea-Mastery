interface ServiceOptionProps {
    option: string;
}

function ServiceOption({option}: ServiceOptionProps) {
    return (
        <div>
            {option}
        </div>
    );
}

export default ServiceOption;
