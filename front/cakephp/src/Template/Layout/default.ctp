<?php
/**
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link          https://cakephp.org CakePHP(tm) Project
 * @since         0.10.0
 * @license       https://opensource.org/licenses/mit-license.php MIT License
 */

$description = 'Areufree';
?>
<!DOCTYPE html>
<html>
    <head>
        <?=$this->
        Html->charset()?>
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
            <title>
                <?=$description?>
                -
                <?=$this->
                fetch('title')?>
            </title>
            <?=$this->
            Html->meta('icon')?>
            <?=$this->
            Html->css('base')?>
            <?=$this->
            Html->css('style')?>
            <?=$this->
            Html->css('navbar')?>
            <?=$this->
            Html->script('scripts')?>
            <?=$this->
            fetch('meta')?>
            <?=$this->
            fetch('css')?>
            <?=$this->
            fetch('script')?>
            <!-- Scripts -->
            <script crossorigin="anonymous" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" src="https://code.jquery.com/jquery-3.3.1.slim.min.js">
            </script>
            <script crossorigin="anonymous" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js">
            </script>
            <script crossorigin="anonymous" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js">
            </script>
            <!-- Material icons -->
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            </link>
            
            <script type="text/javascript" src="http://momentjs.com/downloads/moment-with-locales.min.js"></script>
            <script src="/webroot/js/bootstrap-material-datetimepicker.js"></script>
        <link rel="stylesheet" href="/webroot/css/bootstrap-material-datetimepicker.css" />

        </meta>
    </head>
    <body>
        <!-- NAVBAR -->
        <?php if($this->request->getSession()->read('Auth.User')){ ?>
        <nav class="navbar navbar-expand-lg navbar-light bg-primary nav">
            <!-- <?=$this->Html->image('you-free-logo.png', ['url'=>['controller' => 'Polls', 'action' => 'index'],'class'=>'logo']);?> -->
            <?=$this->Html->link('U | FREE?', ['controller' => 'Polls', 'action' => 'index'], ['class' => 'navbar-brand nav-title font-weight-bold']);?>
            <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler " data-target="#navbarSupportedContent" data-toggle="collapse" type="button">
                <span class="navbar-toggler-icon">
                </span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto center">
                    <?php if ($this->
                    request->getParam('controller') == 'Polls' && $this->request->getParam('action') == 'add') {?>
                    <li class="nav-item active">
                        <?php } else {?>
                        <li class="nav-item">
                            <?php }?>
                            <?=$this->
                            Html->link(__('Create Poll'), ['controller' => 'Polls', 'action' => 'add'], ['class' => 'nav-link']);?>
                        </li>
                        <?php if ($this->
                        request->getParam('controller') == 'Polls' && $this->request->getParam('action') == 'index') {?>
                        <li class="nav-item active">
                            <?php } else {?>
                            <li class="nav-item">
                                <?php }?>
                                <?=$this->
                                Html->link(__('My Polls'), ['controller' => 'Polls', 'action' => 'index'], ['class' => 'nav-link']);?>
                            </li>
                        </li>
                    </li>
                </ul>
                <div class="btn-group lang-group" role="group">
                    <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline-secondary btn-sm dropdown-toggle" data-toggle="dropdown" id="btnGroupDrop1" type="button">
                        <?= __("Language")?>
                    </button>
                    <div aria-labelledby="btnGroupDrop1" class="dropdown-menu dropdown-menu-right">
                        <?=$this->Html->link(__("Spanish"), ['controller' => 'App', 'action' => 'changeLanguage', "es_ES"], ['class' => 'dropdown-item']);?>
                        <?=$this->Html->link(__("English"), ['controller' => 'App', 'action' => 'changeLanguage', "en_GB"], ['class' => 'dropdown-item']);?>
                    </div>
                </div>
                <div class="btn-group" role="group">
                    <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline-secondary btn-sm dropdown-toggle" data-toggle="dropdown" id="btnGroupDrop1" type="button">
                        <?php echo $this->
                        request->getSession()->read('Auth.User.name') ?>
                    </button>
                    <div aria-labelledby="btnGroupDrop1" class="dropdown-menu dropdown-menu-right">
                    <?=$this->
                        Html->link(__('Profile'), ['controller' => 'Users', 'action' => 'edit'], ['class' => 'dropdown-item']);?>
                        <?=$this->
                        Html->link(__('Logout'), ['controller' => 'Users', 'action' => 'logout'], ['class' => 'dropdown-item']);?>
                    </div>
                </div>
            </div>
        </nav>
        <?php } else { ?>
            <div class="btn-group login-lang" role="group">
                    <button aria-expanded="false" aria-haspopup="true" class="btn btn-outline-secondary btn-sm dropdown-toggle" data-toggle="dropdown" id="btnGroupDrop1" type="button">
                        <?= __("Language")?>
                    </button>
                    <div aria-labelledby="btnGroupDrop1" class="dropdown-menu dropdown-menu-right login-lang">
                        <?=$this->Html->link(__("Spanish"), ['controller' => 'App', 'action' => 'changeLanguage', "es_ES"], ['class' => 'dropdown-item']);?>
                        <?=$this->Html->link(__("English"), ['controller' => 'App', 'action' => 'changeLanguage', "en_GB"], ['class' => 'dropdown-item']);?>
                    </div>
                </div>
        <?php } ?>
        <?=$this->Flash->render()?>
        <?=$this->fetch('content')?>
        <!-- Here is the content injected -->
    </body>
</html>
