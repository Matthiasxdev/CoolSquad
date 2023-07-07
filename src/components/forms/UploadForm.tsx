import { ChangeEvent, useRef, useState } from 'react';
import { client } from '@/lib/client/client';
import styles from './uploadform.module.css';
import ImageUpload from '../upload/ImageUpload';
import toast from 'react-hot-toast';
import router from 'next/router';


type Activity = {
  imageURL: String,
  title: String,
  description: String,
  price: String,
  unit: String,
  location: String,
  city?: String
}

export default function ListForm () {
  const [location, setLocation] = useState("Sur place")
  const [disabled, setDisabled] = useState(false);
  const [imageURL, setImageUrl] = useState("")

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLSelectElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  const addActivity = (myData : Activity) => 
    client('/api/activities', { method:'POST', data:{myData}}); // TODO

  const onOptionChange = (e : ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
  }
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = titleRef.current?.value
    const description = descriptionRef.current?.value
    const price = priceRef.current?.value 
    const unit = unitRef.current?.value
    const location = locationRef.current?.value
    const city = cityRef.current?.value
    if (!title || !description || !price || !unit || !location ){return}
    const newActivity: Activity = {imageURL, title,description,price,unit,location,city}
    
    let toastId;

    try {
      setDisabled(true);
      toastId = toast.loading('Submitting...');
      // Submit data
      await addActivity (newActivity) // TODO
      toast.success('Successfully submitted', { id: toastId });
      setDisabled(false);
      router.push("/activities");
    } catch (e) {
      toast.error('Unable to submit', { id: toastId });
      setDisabled(false);
    }
  };

  const upload = async (image: File) => {
    if (!image) return;

    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading('Uploading...'); 
       //TODO
      const data = await client('/api/image-upload', {method: "POST", data: image}) as {url :string}
      console.log("response", data.url)
      setImageUrl(data.url)
      toast.success('Successfully uploaded', { id: toastId });
    } catch (e) {
      toast.error('Unable to upload', { id: toastId });
      console.log(e)
    } finally {
      setDisabled(false);
    }
  };


  return (
    <div className={styles.formcontainer}>
      <form onSubmit={handleSubmit} autoComplete="off" className={styles.form} >
        

        <div className={styles.image}>
        <ImageUpload
          initialImage={{ src: "", alt: "" }}
          onChangePicture={upload}
        />
        </div>

        <div className={styles.input_container}>
          <label htmlFor="title">Titre :</label>
          <input 
          type="text" 
          id="title"
          name="title"
          ref={titleRef}
          placeholder='Animation Casino'
          required
          />
        </div>
        
        <div className={styles.input_container}>
          <label htmlFor="description">Description :</label>
          <input 
          type="text" 
          id="description"
          name="description"
          ref={descriptionRef}
          placeholder='Description'
          />
        </div>

        <div className={styles.input_number}>
          <label htmlFor="price">Prix :</label>
          <input 
          type="number" 
          id="price"
          name="price"
          ref={priceRef}
          min={0}
          max={100000}
          placeholder='Prix'
          required
          />
          {"€"}
        </div>

        <label>
          Selectionnez l'unité
          <select 
          ref={unitRef} 
          name='selectUnit'
          defaultValue="Par personne"
          required
          >
            <option value="Par personne">Par personne</option>
          </select>
        </label> 
        
        
        <p>Où se déroule l'activité ?</p>
        <div  className={styles.location_section}>
          <label 
          className={styles.radio_container}
          htmlFor='onsite'
          >Sur place
            <input
              type="radio"
              value="Sur place"
              name='onsite'
              id="onsite"
              ref={locationRef}
              checked={location === "Sur place"}
              onChange={onOptionChange}
            />
            <span className={styles.checkmark}></span>
          </label>
          <label 
          className={styles.radio_container}  
          htmlFor='online'
          >En ligne
          <input
            type="radio"
            value="En ligne"
            name="online"
            id="online"
            ref={locationRef}
            checked={location === "En ligne"}
            onChange={onOptionChange}
          />
          <span className={styles.checkmark}></span>
          </label>
        </div>
        {
          location === "Sur place" ?
          <div className={styles.input_container}>
            <label htmlFor="city">Dans quelle ville ?</label>
            <input 
            type="text"
            name="city" 
            id="city"
            ref={cityRef}
            placeholder="Paris" 
            required/>
          </div>
          :
          false
        }

        <button type="submit" disabled={disabled}>Enregistrer</button>

      </form>
    </div>
  );
}
