import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  create(createImageDto: CreateImageDto) {
    return fetch(
      'https://my-json-server.typicode.com/icedrone/json-demo-server/images',
      {
        method: 'POST',
        body: JSON.stringify(createImageDto),
      },
    );
  }

  findAll() {
    return Promise.all([
      fetch(
        'https://my-json-server.typicode.com/icedrone/json-demo-server/images',
      ).then((res) => res.json()),
      fetch(
        'https://my-json-server.typicode.com/icedrone/json-demo-server/photos',
      ).then((res) => res.json()),
    ]).then((res) => {
      return (
        res
          .reduce((acc, response) => {
            return [...acc, ...(response[0] || [])];
          }, [])
          // Format images and photos in the same way
          .map(({ path, url, ...image }) => ({
            ...image,
            url: path || url,
          }))
      );
    });
  }

  findOne(id: number) {
    // There is no documentation on fetching image by id from endpoint, so it is currently implemented like find image by id in the result
    return fetch(
      'https://my-json-server.typicode.com/icedrone/json-demo-server/images',
    )
      .then((res) => res.json())
      .then((data) => data.find((image) => image.id === id));
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return fetch(
      `https://my-json-server.typicode.com/icedrone/json-demo-server/images/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(updateImageDto),
      },
    );
  }

  remove(id: number) {
    return fetch(
      `https://my-json-server.typicode.com/icedrone/json-demo-server/images/${id}`,
      {
        method: 'DELETE',
      },
    ).then((res) => {
      if (res.ok) {
        return `This action removes a #${id} image`;
      }

      throw new Error(`Image #${id} not removed.`);
    });
  }
}
