import React, {useEffect, useState} from 'react';

interface IFetchableListItemProps {
    url: string;
    property: string;
    prefix?: string;
}

export default  ({ url, property, prefix = "" }: IFetchableListItemProps) => {
    interface IFetchData {
        [property: string]: string;
    }

    const [fetchedData, setFetchedData] = useState<IFetchData | null>(null);
    // console.log('***url', url);

    useEffect(() => {
        setFetchedData(null);
        fetch(url)
            .then(data => data.json())
            .then(info => setFetchedData(info));
    }, [url]);

    return (
        <span data-testid="list-item-fetch">
            {
                (fetchedData) ? (
                    prefix + fetchedData[property]
                ) : (`Loading this URL ${url}...`)
            }
        </span>
    );
};