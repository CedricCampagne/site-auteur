<script>
  let isOpen = false;
  import Icon from "@iconify/svelte";
</script>

<header>
    <div class="flex justify-around p-2">
        <div class="p-2">Katia Campagne</div>
        <nav>
          <ul class="flex">
              <li class="p-2">
                  <a href="">Accueil</a>
              </li>
              <li class="p-2">
                  <a href="">Livres</a>
              </li>
              <li class="p-2">
                  <a href="">Chroniques</a>
              </li>
              <li class="p-2">
                  <a href="">A propos</a>
              </li>
              <li class="p-2">
                  <a href="">Contact</a>
              </li>
              <li class="p-2">
                  <Icon icon="ri:moon-fill" class="text-xl" />
              </li>   
          </ul>
        </nav>
        <button class="bg-accent1 text-white px-4 rounded-3xl cursor-pointer">Newsletter</button>
    </div>
</header>
