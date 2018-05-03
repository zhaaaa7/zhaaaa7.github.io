1. think about responsive design from the beginning
2. min-content  --- span in columns
3. grid-template-columns: 8rem 1fr repeat(8,minmax(min-content,14rem)) 1fr;  use fr to center a 8-column 
4. .features{feature $}*6
5. scss @extend , add seletor together to one rule. @include add one rule block to different selector
6. grid-row: 1 / -1; -1 here means the last explicit row
7. helper class sm md lg hg
8. images has to keep ratio so it may not take up all the grid area: align-items: center
9. background-image:linear-gradient(rgba($color-primary, .5), rgba($color-primary, .5)), url(../img/back.jpg);
 has a color overlay on top
10. control + shift + command + -> expand selection
11. find the smallese item in the gallery grid
12. object-fit, add a parent div and set the img width: 100%
13. (figure.gallery__item.gallery__item--$>img.gallery__img[src="./img/gal-$.jpeg"][alt="gallery image $"])*14
14. auto-fit will decide how many tracks is needed, grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
15. 1fr push every other elements
16. filter: brightness(75%);

17. text, ::before and ::after can be treated as grid cell